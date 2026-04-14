import { useState, JSX } from 'react';
import axios from 'axios';
import { useAdminStore } from '../../../store/adminStore';
import styles from './pinLogin.module.css';

const API_URL = import.meta.env.VITE_STRAPI_URL;

export default function PinLogin(): JSX.Element {
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setAuthenticated } = useAdminStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || pin.length < 1) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/api/pin/verify`, { pin });
      const data = response.data;
      console.log('Frontend PIN Verification Result:', data);

      if (data.success) {
        setAuthenticated(true);
      } else {
        setError(data.message || 'неверный пин-код');
        setPin('');
      }
    } catch (err) {
      console.error('Frontend PIN Error:', err);
      setError('ошибка сервера');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="password"
              className={styles.pinInput}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={8}
              autoFocus
            />
            <div className={`${styles.error} ${error ? styles.errorActive : ''}`}>
              {error}
            </div>
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={loading || pin.length < 1}
          >
            {loading ? 'проверка...' : 'войти'}
          </button>
        </form>
      </div>
    </div>
  );
}

import { JSX, useState, useEffect } from 'react';
import { fetchMarquee, updateMarquee } from '../../../api/marquee';
import styles from './marqueeAdminPage.module.css';
import AdminHeader from '@/components/adminHeader/AdminHeader';

export default function MarqueeAdminPage(): JSX.Element {
  const [texts, setTexts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchMarquee().then((data) => {
      setTexts(data || []);
      setIsLoading(false);
    });
  }, []);

  const handleChange = (index: number, value: string) => {
    const newTexts = [...texts];
    newTexts[index] = value;
    setTexts(newTexts);
  };

  const handleAdd = () => {
    setTexts([...texts, '']);
  };

  const handleRemove = (index: number) => {
    const newTexts = texts.filter((_, i) => i !== index);
    setTexts(newTexts);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedTexts = await updateMarquee(texts);
      setTexts(updatedTexts);
      alert('Успешно сохранено!');
    } catch (error) {
      alert('Ошибка при сохранении. Проверьте консоль для деталей.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className={styles.container}>Загрузка...</div>;
  }

  return (
    <>
      <AdminHeader title="Редактирование строки" showBack />

      <div className={styles.container}>
        <div className={styles.formContainer}>
          {texts.map((text, index) => (
            <div key={index} className={styles.inputGroup}>
              <input
                type="text"
                value={text}
                onChange={(e) => handleChange(index, e.target.value)}
                className={styles.input}
                placeholder="Введите текст..."
              />
              <button
                onClick={() => handleRemove(index)}
                className={styles.removeButton}
                title="Удалить"
              >
                ✕
              </button>
            </div>
          ))}

          <div className={styles.actions}>
            <button onClick={handleAdd} className={styles.addButton}>
              +
            </button>

            <button
              onClick={handleSave}
              className={styles.saveButton}
              disabled={isSaving}
            >
              {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

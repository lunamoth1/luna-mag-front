import { JSX, useState, useEffect } from 'react';
import { fetchCreators, addCreator, updateCreator, deleteCreator, Creator } from '@/api/creator';
import styles from './creatorsAdminPage.module.css';
import AdminHeader from '@/components/adminHeader/AdminHeader';

export default function CreatorsAdminPage(): JSX.Element {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const loadCreators = async () => {
    setIsLoading(true);
    const data = await fetchCreators();
    setCreators(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadCreators();
  }, []);

  const handleEdit = (creator: Creator) => {
    setEditingDocId(creator.documentId);
    setName(creator.name);
    setBio(creator.Bio);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingDocId(null);
    setName('');
    setBio('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert('Имя обязательно');

    setIsSaving(true);
    try {
      if (editingDocId) {
        await updateCreator(editingDocId, { name, Bio: bio });
      } else {
        await addCreator({ name, Bio: bio });
      }
      handleCancel();
      await loadCreators();
      alert(editingDocId ? 'Обновлено' : 'Создано');
    } catch (error) {
      alert('Ошибка при сохранении');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (docId: string) => {
    if (!confirm('Вы уверены, что хотите удалить этого автора?')) return;

    try {
      await deleteCreator(docId);
      await loadCreators();
    } catch (error) {
      alert('Ошибка при удалении');
    }
  };

  if (isLoading) {
    return <div className={styles.container}>Загрузка...</div>;
  }

  return (
    <>
      <AdminHeader title="Управление креаторами" showBack />

      <div className={styles.container}>
        <section className={styles.formSection}>
          <h2>{editingDocId ? 'Редактировать' : 'Добавить нового'}</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputField}>
              <label>Имя:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputField}>
              <label>Био:</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className={styles.textarea}
              />
            </div>
            <div className={styles.formActions}>
              {editingDocId && (
                <button type="button" onClick={handleCancel} className={styles.cancelButton}>
                  Отмена
                </button>
              )}
              <button type="submit" className={styles.submitButton} disabled={isSaving}>
                {isSaving ? 'Сохранение...' : editingDocId ? 'Обновить' : 'Создать'}
              </button>
            </div>
          </form>
        </section>

        <div className={styles.list}>
          <h2>Список авторов</h2>
          {creators.length === 0 ? (
            <div className={styles.emptyState}>Список пока пуст. Добавьте первого автора выше!</div>
          ) : (
            creators.map((creator) => (
              <div key={creator.documentId} className={styles.item}>
                <div className={styles.itemInfo}>
                  <h3>{creator.name}</h3>
                  <p>{creator.Bio || 'Нет описания'}</p>
                </div>
                <div className={styles.itemActions}>
                  <button onClick={() => handleEdit(creator)} className={styles.editButton}>
                    Правка
                  </button>
                  <button onClick={() => handleDelete(creator.documentId)} className={styles.deleteButton}>
                    Удалить
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

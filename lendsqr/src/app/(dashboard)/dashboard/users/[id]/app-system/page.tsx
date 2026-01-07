import styles from '@/style/additions.module.scss';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AppSystem({ params }: Props) {
  return (
    <div className={styles.comingSoon}>
       <h1>App and Systems page</h1>
      <h2>Coming Soon!!!</h2>
    </div>
  );
}

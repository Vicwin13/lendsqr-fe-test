import styles from '@/style/additions.module.scss';

type Props = {
  params: {
    id: string;
  };
};

export default async function BankDetails({ params }: Props) {
  return (
    <div className={styles.comingSoon}>
      <h1>Bank Details Page</h1>
      <h2>Coming Soon!!!</h2>
    </div>
  );
}

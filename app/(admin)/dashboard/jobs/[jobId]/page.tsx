/** @format */

type Props = {
  params: Promise<{ jobId: string }>;
};

async function jobDetailsPage({ params }: Props) {
  const { jobId } = await params;
  console.log(jobId);
  return (
    <div>
      <h1>Job Details</h1>
    </div>
  );
}
export default jobDetailsPage;

/** @format */

type Props = {
  params: Promise<{ applicationId: string }>;
};

async function ApplicationReviewPage({ params }: Props) {
  const { applicationId } = await params;
  console.log(applicationId);
  return (
    <div>
      <h1>Application Review</h1>
    </div>
  );
}
export default ApplicationReviewPage;

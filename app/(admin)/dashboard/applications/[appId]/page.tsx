/** @format */

type Props = {
  params: Promise<{ applicationId: string }>;
};

async function ApplicationDetailsPage({ params }: Props) {
  const { applicationId } = await params;
  console.log(applicationId);
  return (
    <div>
      <h1>Application Details</h1>
    </div>
  );
}
export default ApplicationDetailsPage;

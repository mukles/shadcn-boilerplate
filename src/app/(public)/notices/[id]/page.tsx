import { getSingleNotice } from "@/actions";
import DataFetchError from "@/components/data-fetching-error";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamicParams = false;

export default async function SingleNoticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getSingleNotice(id);

  if ("error" in data) {
    return (
      <DataFetchError
        title={data.message || "Failed to load notices"}
        errors={data.error}
        className="section"
      />
    );
  }

  const notice = data.result;

  return (
    <section>
      <div className="container">
        <div className="max-w-sm">
          <Card className="p-6">
            <CardHeader>
              <CardTitle>{notice.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{notice.description}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// export async function generateStaticParams() {
//   const data = await getNotices();

//   if ("error" in data) {
//     return [];
//   }

//   const { notices = [] } = data.result;

//   return notices.map((notice) => ({
//     id: notice.id,
//   }));
// }

import { getAllExhibitsAPI } from "@/src/api/exhibitActions";
import StripeWidget from "@/src/components/StripeWidget/StripeWidget";
import { Exhibit } from "@/src/types/Exhibit";

interface PageProps {
  params: {
    page?: string;
  };
}

const StripePage = async ({ params }: PageProps) => {
  const currentPage = params.page ? Number(params.page) : 1;

  const response = await getAllExhibitsAPI(currentPage);
  const exhibits: Exhibit[] = response.data;
  const lastPage: number = response.lastPage;

  return (
    <StripeWidget exhibits={exhibits} lastPage={lastPage} page={currentPage} />
  );
};

export default StripePage;

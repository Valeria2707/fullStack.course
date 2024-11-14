import { Exhibit } from "@/src/types/Exhibit";
import HomeWidget from "@/src/components/HomeWidget/HomeWidget";
import { getAllExhibitsAPI } from "@/src/api/exhibitActions";

interface PageProps {
  params: {
    page: string;
  };
}

const HomePage = async ({ params }: PageProps) => {
  const { page } = params;
  const currentPage = page || 1;

  const response = await getAllExhibitsAPI(Number(currentPage));
  const exhibits: Exhibit[] = response.data;
  const lastPage: number = response.lastPage;

  return (
    <HomeWidget
      initialExhibits={exhibits}
      lastPage={lastPage}
      page={Number(currentPage)}
    />
  );
};

export default HomePage;

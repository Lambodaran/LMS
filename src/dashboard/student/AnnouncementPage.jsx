import AnnouncementList from "../../components/AnnouncementList";
import PageHeader from "../../components/PageHeader";

function AnnouncementPage() {
  return (
    <>
      <div className="">
        <PageHeader title={"Announcement"} />
        <div className="flex p-4 lg:p-8 gap-8">
          <div className=" flex-1 flex flex-col gap-6">
            <AnnouncementList />
          </div>
          {/* <PinnedAnnouncement /> */}
        </div>
      </div>
    </>
  );
}

export default AnnouncementPage;

const PinnedAnnouncement = () => {
  return (
    <>
      <div className="sticky top-0 right-0 bg-green-200 p-4 min-w-52">
        Pinner Announcement
      </div>
    </>
  );
};

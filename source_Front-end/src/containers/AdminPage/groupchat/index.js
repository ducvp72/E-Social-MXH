import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import NavbarInput from "@material-tailwind/react/NavbarInput";
import {
  GroupChatElement,
  GroupChatDetail,
} from "../../../components-Admin/details/groupChat";

const GroupChatDB = () => {
  return (
    <>
      <div className="bg-white-500 pt-20 pb-28 px-3 md:px-8 h-auto">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 px-4 mb-16">
            <Card>
              <CardHeader color="purple" contentPosition="right">
                <div className="flex items-center space-x-4">
                  <h2 className="text-white text-2xl">100 result</h2>
                  <div className="">
                    <NavbarInput placeholder="Search" />
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="overflow-x-auto">
                  <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                      <GroupChatDetail />
                    </thead>
                    <tbody>
                      <GroupChatElement />
                      <GroupChatElement />
                      <GroupChatElement />
                      <GroupChatElement />
                      <GroupChatElement />
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupChatDB;

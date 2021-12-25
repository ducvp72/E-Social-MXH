import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import NavbarInput from "@material-tailwind/react/NavbarInput";
import { UserElement, UserDetail } from "./details/user";

export default function CardTable() {
  return (
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
              <UserDetail />
            </thead>
            <tbody>
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}

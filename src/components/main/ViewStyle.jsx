import Button from "../../ui/common/Button";
import Card from "../../ui/common/Card";
import Divider from "../../ui/common/Divider";
import Header from "../../ui/common/Header";
import Input from "../../ui/common/Input";
import Loader from "../../ui/common/Loader";
import Spacing from "../../ui/common/Spacing";
import Text from "../../ui/common/Text";
import Toast from "../../ui/common/Toast";

const ViewStyle = () => {
  return (
    <div>
      <Header level={1}>Main Page</Header>
      <Toast message="This is a toast messaged" show={true}/>
      <Button>Click me</Button>
      <Spacing top="20px" bottom="20px"/>
      <Text>Enter your name</Text>
      <Input placeholder="Enter your name" />
      <Card><Loader/></Card>
      <Divider/>
    </div>

  );
};

export default ViewStyle;  
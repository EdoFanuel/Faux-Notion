import Header from "@/components/header";
import Paragraph from "@/components/paragraph";

export default function Home() {
  return (
    <div>
      <Header title='Hello World' level={1}/>
      <Paragraph content='lorem ipsum'></Paragraph>
    </div>
  );
}

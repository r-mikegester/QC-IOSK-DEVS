import SideBar from "../../sidebar/sidebarLayout";

interface ContainerProps {
  name: string;
}

const Batasan: React.FC<ContainerProps> = ({ name }) => {
  return (
    <>
      <SideBar />
      <div className="container mx-auto text-base-content">
        <strong className="text-9xl">{name}</strong>
        <p>Explore <a target="_blank" rel="noopener noreferrer" href="/">more campus later</a></p>
      </div>
    </>
  );
};

export default Batasan;

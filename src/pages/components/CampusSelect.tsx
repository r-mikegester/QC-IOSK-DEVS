import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const CampusSelect: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container mx-auto ">
      <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">more campus later</a></p>
    </div>
  );
};

export default CampusSelect;

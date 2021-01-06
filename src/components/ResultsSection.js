import MediaEmbeder from "./MediaEmbeder";

const ResultsSection = ({ data, lastPostRef }) => {
  return (
    <div className="results">
      {data.map((item, index) => {
        if (data.length === index + 1) {
          return (
            <MediaEmbeder
              lastPostRef={lastPostRef}
              media={item.data}
              key={item.data.id}
            />
          );
        } else {
          return <MediaEmbeder media={item.data} key={item.data.id} />;
        }
      })}
    </div>
  );
};

export default ResultsSection;

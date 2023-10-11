interface UserIDPageProps {
  params: {
    id: string;
  };
}

function UserIDPage(props: UserIDPageProps) {
  const { params } = props;

  return <p>{params.id}</p>;
}

export default UserIDPage;

export default function LinkCard(props: User) {
  const { user } = props;
  const { links, timezone } = user;

  const listLinks = links.map((x) => <div>{`${x.site}: ${x.url}`}</div>);

  return (
    <>
      <div>{`Timezone: ${timezone}`}</div>
      {listLinks}
    </>
  );
}

export default function ProfilePageCard(props: User) {
  const { user } = props;
  const { profilePicture, firstName, lastName, jobTitle, userDescription } =
    user;
  return (
    <>
      <img src={profilePicture} alt="user's headshot" />
      <div id="name">{`${firstName} ${lastName}`}</div>
      <div id="job-title">{jobTitle}</div>
      <div id="description">{userDescription}</div>
    </>
  );
}

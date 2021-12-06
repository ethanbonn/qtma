export default function SkillCard(props: User) {
  const { User } = props;
  const { skillIdList } = user;

  // query for each skill in the db to get the "skill name"
  // display each skill

  const dummySkills = [
    { skill: "UX Design", colour: "red" },
    { skill: "Frontend Development", colour: "yellow" },
    { skill: "Mobile Development", colour: "skyBlue" },
    { skill: "Graphic Design", colour: "green" },
    { skill: "Photography", colour: "pink" },
    { skill: "Videography", colour: "orange" },
  ];

  return (
    <>
      <div className="font-sans max-w-auto min-w-auto mx-10 bg-white rounded-xl shadow-lg flex flex-row m-10 border-2 border-green-normal">
        <div className="max-w-xs w-full rounded-xl  overflow-hidden shadow-lg">
          <div className="px-2 pb-2">
            {dummySkills.map((x) => (
              <span
                className={`inline-block bg-${x.colour}-normal rounded-full px-3 py-1 text-sm font-semibold text-black mx-2 my-2`}
              >
                {x.skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

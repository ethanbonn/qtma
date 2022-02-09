import type { User} from "../../types/models";


interface userWrapper {
  user : User
}

export default function SkillCard(props: userWrapper) {
  const user : User = props.user;
  const { skills } = user;


  // query for each skill in the db to get the "skill name"
  // display each skill


  return (
    <>
      <div className="font-sans max-w-auto min-w-auto mx-10 bg-white rounded-xl shadow-lg flex flex-row m-10 border-2 border-green-normal">
        <div className="max-w-xs w-full rounded-xl  overflow-hidden shadow-lg">
          <div className="px-2 pb-2">
            {skills.map((x) => (
              <span
                className={`inline-block bg-blue-normal rounded-full px-3 py-1 text-sm font-semibold text-black mx-2 my-2`}
              >
                {x.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

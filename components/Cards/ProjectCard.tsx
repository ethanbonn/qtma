import type { Project, Skill } from "../../types/models";


// export default function ProjectCard({ project_name, project_skills }) {
export default function ProjectCard(props : Project) {
   const { name, skills } = props;
  return (
    <div className=" max-w-auto mx-10 bg-white rounded-xl shadow-lg flex m-10 ">
      <div className="max-w-sm  rounded-xl  overflow-hidden shadow-lg">
        <img className="w-80" src="https://api.time.com/wp-content/uploads/2020/06/crystalball.jpg?w=800&quality=85" alt="project" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-blue-normal">{name}</div>
          {/* <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, Nonea! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p> */}
          <p className="text-gray-500 font-normal">Desired Skills:</p>
        </div>
        <div className="px-6  pb-2">
          {
            skills.map((e) => {
              return (
                <span className={`inline-block + bg-${e.colour}-normal rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2" `}>
                  {e.name}
                </span>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

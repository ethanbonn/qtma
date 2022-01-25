import type { User, Link } from "../../types/models";

interface userWrapper {
  user : User
}

export default function LinkCard(props: userWrapper) {
  const user : User = props.user;
  // const  usr : User = props;
  // console.log(user);
  // console.log(usr)
  // console.log(usr.user.timezone);
  const links : Link[] = user.links!;
  const {timezone} = user;

  return (
    <>
      <div className="font-sans max-w-auto min-w-auto mx-10 bg-white rounded-xl shadow-lg flex flex-row m-10 border-2 border-green-normal">
        <div className="max-w-xs w-full rounded-xl  overflow-hidden shadow-lg">
          <div className="px-2 pb-2">
            <div className="text-center text-sm font-semibold mt-2">{`Timezone: ${timezone}`}</div>
            {links.map((x) => (
              <span
                className={`inline-block bg-${x.colour}-normal rounded-full px-3 py-1 text-sm font-semibold text-black mx-2 my-2`}
              >
                <a target="_blank" href={`${x.url}`} rel="noreferrer">
                  {x.site}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

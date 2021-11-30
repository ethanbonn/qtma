<!--
{linksList.map((_, i) => (
  <>
    <br />
    <label htmlFor={`links${i}`}>
      {i === 0 && "Links:"}
      <br />
      <input
        type="text"
        id={`links${i}`}
        defaultValue={isTypeUser ? props.links : undefined}
        {...register(`links.${i}`, {
          maxLength: 500,
          onChange: (e) =>
            handleInputChange(e, i, "links", linksList, setLinksList),
        })}
      />
      {i === 0 && (
        <button
          type="button"
          onClick={() => setLinksList([...linksList, { links: "" }])}
        >
          +
        </button>
      )}
    </label>
  </>
))}
<br />


{skillsList.map((_, i) => (
  <>
    <br />
    <label htmlFor={`skills${i}`}>
      {i === 0 && "Skills:"}
      <br />
      <input
        type="text"
        id={`skills${i}`}
        defaultValue={isTypeUser ? props.skills : undefined}
        {...register(`skills.${i}`, {
          maxLength: 500,
          onChange: (e) =>
            handleInputChange(e, i, "skills", skillsList, setSkillsList),
        })}
      />
      {i === 0 && (
        <button
          type="button"
          onClick={() => setSkillsList([...skillsList, { skills: "" }])}
        >
          +
        </button>
      )}
    </label>
  </>
))}
<br />

{projectsList.map((_, i) => (
  <>
    <br />
    <label htmlFor={`projects${i}`}>
      {i === 0 && "Projects:"}
      <br />
      <input
        type="text"
        id={`projects${i}`}
        defaultValue={isTypeUser ? props.project_ids : undefined}
        {...register(`projects.${i}`, {
          maxLength: 500,
          onChange: (e) =>
            handleInputChange(
              e,
              i,
              "projects",
              projectsList,
              setProjectsList
            ),
        })}
      />
      {i === 0 && (
        <button
          type="button"
          onClick={() =>
            setProjectsList([...projectsList, { projects: "" }])
          }
        >
          +
        </button>
      )}
    </label>
  </>
))}
<br />


{JSON.stringify(linksList)}
<br />
{JSON.stringify(skillsList)}
<br />
{JSON.stringify(projectsList)}
<br />

-->

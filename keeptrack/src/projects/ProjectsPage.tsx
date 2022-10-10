// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useProjects } from './projectHooks';
// import { AppState } from '../state';
// import { loadProjects } from './state/projectActions';
// import { AnyAction } from 'redux';
// import { ThunkDispatch } from 'redux-thunk';
// import { ProjectState } from './state/projectTypes';
// import ProjectList from './ProjectList';
// function ProjectsPage() {
//     // const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
//     const loading = useSelector(
//         (appState: AppState) => appState.projectState.loading
//     );
//     const projects = useSelector(
//         (appState: AppState) => appState.projectState.projects
//     );
//     const error = useSelector(
//         (appState: AppState) => appState.projectState.error
//     );
//     const currentPage = useSelector(
//         (appState: AppState) => appState.projectState.page
//     );
//     const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();
//     useEffect(() => {
//         dispatch(loadProjects(1));
//     }, [dispatch]);

//     const handleMoreClick = () => {
//         dispatch(loadProjects(currentPage + 1));
//     };

//     return (
//         <React.Fragment>
//             <h1>Projects</h1>
//             {
//                 error && (
//                     <div className="row">
//                         <div className="card large error">
//                             <section>
//                                 <p>
//                                     <span className="icon-alert inverse "></span>
//                                     {error}
//                                 </p>
//                             </section>
//                         </div>
//                     </div>
//                 )
//             }
//             <ProjectList  projects={projects}></ProjectList>
//             {!loading && !error && (
//                 <div className="row">
//                     <div className="col-sm-12">
//                         <div className="button-group fluid">
//                             <button className="button default" onClick={handleMoreClick}>
//                                 More...
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             {
//                 loading && (
//                     <div className="center-page">
//                         <span className="spinner primary"></span>
//                         <p>Loading...</p>
//                     </div>
//                 )
//             }
//         </React.Fragment>
//     )
// }

// export default ProjectsPage;


// Hooks implementations with react query


import React, { useEffect, useState } from 'react';
import { useProjects } from './projectHooks';
import ProjectList from './ProjectList';

function ProjectsPage() {
  const {
    data,
    isLoading,
    error,
    isError,
    isFetching,
    page,
    setPage,
    isPreviousData,
  } = useProjects();

  return (
    <>
      <h1>Projects</h1>

      {data ? (
        <>
          {isFetching && <span className="toast">Refreshing...</span>}
          <ProjectList projects={data} />
          <div className="row">
            <div className="col-sm-4">Current page: {page + 1}</div>
            <div className="col-sm-4">
              <div className="button-group right">
                <button
                  className="button "
                  onClick={() => setPage((oldPage) => oldPage - 1)}
                  disabled={page === 0}
                >
                  Previous
                </button>
                <button
                  className="button"
                  onClick={() => {
                    if (!isPreviousData) {
                      setPage((oldPage) => oldPage + 1);
                    }
                  }}
                  disabled={data.length != 10}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      ) : isLoading ? (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      ) : isError && error instanceof Error ? (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error.message}
              </p>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ProjectsPage;

// return (
//   <>
//     <h1>Header</h1>
//     {data ? (
//       <p>data</p>
//     ) : isLoading ? (
//       <p>Loading...</p>
//     ) : isError ? (
//       <p>Error Message</p>
//     ) : null}
//   </>
// );

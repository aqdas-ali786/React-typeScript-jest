import React, { SyntheticEvent, useState } from "react";
import { useDispatch } from 'react-redux';
// import { saveProject } from './state/projectActions';
import { useSaveProject } from './projectHooks';
import { ThunkDispatch } from 'redux-thunk';
import { ProjectState } from './state/projectTypes';
import { AnyAction } from 'redux';
import { Project } from './Project';
interface ProjectFormProps {
    project: Project;
    onCancel: () => void;
}
function ProjectForm({ project: initialProject, onCancel }: ProjectFormProps) {
    const [project, setProject] = useState(initialProject);
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget: '',
    });

    const { mutate: saveProject, isLoading } = useSaveProject();

    const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();

    function validate(project: Project) {
        let errors: any = { name: '', description: '', budget: '' };
        if (project.name.length === 0) {
            errors.name = 'Name is required';
        }
        if (project.name.length > 0 && project.name.length < 3) {
            errors.name = 'Name needs to be at least 3 characters.';
        }
        if (project.description.length === 0) {
            errors.description = 'Description is required.';
        }
        if (project.budget === 0) {
            errors.budget = 'Budget must be more than $0.';
        }
        return errors;
    }

    function isValid() {
        return (
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0
        );
    }

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (!isValid()) return;
        // dispatch(saveProject(project));
        saveProject(project);
    }

    const handleChange = (event: any) => {
        const { type, name, value, checked } = event.target;
        let updatedValue = type === 'checkbox' ? checked : value;
        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name]: updatedValue,
        };
        let updatedProject: Project;
        setProject((p) => {
            updatedProject = new Project({ ...p, ...change });
            return updatedProject;
        });
        setErrors(() => validate(updatedProject));
    }
    return (
        <form onSubmit={handleSubmit} className="input-group vertical">
            {isLoading && <span className="toast">Saving...</span>}
            <label htmlFor="name">Project Name</label>
            <input
                type="text"
                placeholder="enter name"
                name="name"
                value={project.name}
                onChange={handleChange}
            />
            {
                errors.name.length > 0 && (
                    <div className="card error">
                        <p>{errors.name}</p>
                    </div>
                )
            }
            <label htmlFor="description">Project Description</label>
            <textarea
                value={project.description}
                onChange={handleChange}
                name="description"
                placeholder="enter description" />
            {
                errors.description.length > 0 && (
                    <div className="card error">
                        <p>{errors.description}</p>
                    </div>
                )
            }
            <label htmlFor="budget">Project Budget</label>
            <input
                type="number"
                value={project.budget}
                name="budget"
                onChange={handleChange}
                placeholder="enter budget" />
            {
                errors.budget.length > 0 && (
                    <div className="card error">
                        <p>{errors.budget}</p>
                    </div>
                )
            }
            <label htmlFor="isActive">Active?</label>
            <input
                type="checkbox"
                name="isActive"
                checked={project.isActive}
                onChange={handleChange}
            />
            <div className="input-group">
                <button className="primary bordered medium">Save</button>
                <span />
                <button onClick={onCancel} type="button" className="bordered medium">
                    cancel
                </button>
            </div>
        </form>
    );
}

export default ProjectForm;
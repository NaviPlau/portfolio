/**
 * Represents a project with various attributes.
 * 
 * @interface Project
 * @property {Object} [key] - A dynamic key representing a specific project.
 * @property {string} number - The unique identifier for the project.
 * @property {string} title - The title of the project.
 * @property {string} description - A brief description of the project.
 * @property {string[]} icons - An array of icon URLs associated with the project.
 * @property {string} image - The URL of the project's main image.
 * @property {string} githubLink - The URL to the project's GitHub repository.
 * @property {string} liveLink - The URL to the live project or demo.
 */
export interface Project {
  [key: string]: {
    number: string;
    title: string;
    description: string;
    icons: string[];
    image: string;
    githubLink: string;
    liveLink: string;
  };
}

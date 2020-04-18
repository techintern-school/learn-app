// user 
export const SET_USER = 'SET_USER'
export function setUser(user) {
    return { type: SET_USER, user }
}

// learning 
export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT'
export const MARK_PROJECT_COMPLETED = 'MARK_PROJECT_COMPLETED'
export const SET_CURIC_VERSION = 'SET_CURIC_VERSION'
export const ADD_COMPLETED_SECTION = 'ADD_COMPLETED_SECTION'
export const REMOVE_COMPLETED_SECTION = 'REMOVE_COMPLETED_SECTION'
export const PROJECT_COMPLETE_CONSTANT = 1
export const PROJECT_INCOMPLETE_CONSTANT = 0

export function setActiveProject(index) {
    return { type: SET_CURRENT_PROJECT, index }
}

export function setCuricVersion(version) {
    return { type: SET_CURIC_VERSION, version }
}

export function markProjectCompleted(index) {
    return { type: MARK_PROJECT_COMPLETED, index }
}

export function setSectionComplete(sectionID) {
    return { type: ADD_COMPLETED_SECTION, sectionID }
}

export function setSectionIncomplete(sectionID) {
    return { type: REMOVE_COMPLETED_SECTION, sectionID }
}


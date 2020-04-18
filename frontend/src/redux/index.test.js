import { userReducer, learningReducer, handleProjectCompleted } from './index.js';
import { setUser, setCuricVersion, setActiveProject, markProjectCompleted, setSectionIncomplete, setSectionComplete } from './actions.js'

test('handleProjectCompleted marks the right projects as completed', () => {
    expect(handleProjectCompleted(0, [])).toStrictEqual([1])
    expect(handleProjectCompleted(0, [0])).toStrictEqual([1])
    expect(handleProjectCompleted(0, [0,1])).toStrictEqual([1,1])
    expect(handleProjectCompleted(0, [0,0,1])).toStrictEqual([1,0,1])
    expect(handleProjectCompleted(1, [1])).toStrictEqual([1,1])
    expect(handleProjectCompleted(1, [1,0,0,1])).toStrictEqual([1,1,0,1])
    expect(handleProjectCompleted(3, [1,1,1,1])).toStrictEqual([1,1,1,1])
    expect(handleProjectCompleted(4, [1,1,1,1])).toStrictEqual([1,1,1,1,1])
    expect(handleProjectCompleted(4, [1])).toStrictEqual([1,0,0,0,1])
});


test('userReducer', () => {
  const testUser = {name: 'foo'}
  expect(userReducer({}, setUser(testUser))).toEqual(testUser);
  expect(userReducer({user: {name: 'otherUser'}}, setUser(testUser))).toEqual(testUser);
});

test('learningReducer', () => {
  const defaultState = {
    activeProject: 0, 
    completedProjects: [], 
    curicVersion: 1, 
    completedSections: ['123', '456']
  }
  expect(learningReducer(defaultState, setActiveProject(2))).toEqual({
    activeProject: 2, 
    completedProjects: [], 
    curicVersion: 1, 
    completedSections: ['123', '456']
  });

  expect(learningReducer(defaultState, setCuricVersion(2))).toEqual({
    activeProject: 0, 
    completedProjects: [], 
    curicVersion: 2, 
    completedSections: ['123', '456']
  });

  expect(learningReducer(defaultState, markProjectCompleted(2))).toEqual({
    activeProject: 0, 
    completedProjects: [0,0,1], 
    curicVersion: 1, 
    completedSections: ['123', '456']
  });

  expect(learningReducer(defaultState, markProjectCompleted(0))).toEqual({
    activeProject: 0, 
    completedProjects: [1], 
    curicVersion: 1, 
    completedSections: ['123', '456']
  });

  expect(learningReducer(defaultState, setSectionComplete('789'))).toEqual({
    activeProject: 0, 
    completedProjects: [], 
    curicVersion: 1,
    completedSections: ['123', '456', '789']
  });

  expect(learningReducer(defaultState, setSectionIncomplete('123'))).toEqual({
    activeProject: 0, 
    completedProjects: [], 
    curicVersion: 1,
    completedSections: ['456']
  });
});

import { userReducer, learningReducer, handleProjectCompleted } from './index.js';
import { setUser, setCuricVersion, setCurrentProject, markProjectCompleted } from './actions.js'

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
  expect(userReducer({}, setUser(testUser))).toEqual({user: testUser});
  expect(userReducer({user: {name: 'otherUser'}}, setUser(testUser))).toEqual({user: testUser});
});

test('learningReducer', () => {
  const defaultState = {
    currentProject: 0, 
    completedProjects: [], 
    curicVersion: 1
  }
  expect(learningReducer(defaultState, setCurrentProject(2))).toEqual({
    currentProject: 2, 
    completedProjects: [], 
    curicVersion: 1
  });

  expect(learningReducer(defaultState, setCuricVersion(2))).toEqual({
    currentProject: 0, 
    completedProjects: [], 
    curicVersion: 2
  });

  expect(learningReducer(defaultState, markProjectCompleted(2))).toEqual({
    currentProject: 0, 
    completedProjects: [0,0,1], 
    curicVersion: 1
  });

  expect(learningReducer(defaultState, markProjectCompleted(0))).toEqual({
    currentProject: 0, 
    completedProjects: [1], 
    curicVersion: 1
  });
});

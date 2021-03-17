import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'

export const activityService = {
  add,
  query,
  remove
}


function query(filterBy) {
  // return httpService.get('activity', filterBy)
  return storageService.query('activity')
}

function remove(activityId) {
  // return httpService.delete(`review/${activityId}`)
  return storageService.delete('activity', activityId)
  /// can only delete comments

}
async function add(activity) {
  // const addedActivity = await httpService.post(`activity`, activity)
  const addedActivity = storageService.post('activity', activityId)
  return addedActivity
}

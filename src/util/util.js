

//根据用户信息，返回跳转地址
export function getRedirectPath({ type, avatar }) {
  let url = (type === 'boss') ? '/boss' : 'jobSeekers'
  if (!avatar) {
    url += 'info'
  }
  return url
}

export function getChatId(userId, targetId) {
  return [userId, targetId].sort().join('_')
}
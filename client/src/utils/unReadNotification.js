export const unReadNotificationFunc = (notification) => {
  return notification.filter((n) => n.isRead == false);
};

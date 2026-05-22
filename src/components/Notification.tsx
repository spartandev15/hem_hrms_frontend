interface NotificationProps {
  data: any;
}
export const NotificationComp = ({ data }: NotificationProps) => {
  return (
    <div className="notification-container">
      {data.map((item: any) => (
        <div className="notification-list text-xsmall">{item.title}</div>
      ))}
    </div>
  );
};

interface IUpdateTime {
  updateTime: string;
}

const UpdateTime = ({ updateTime }: IUpdateTime) => {
  return <span>Last update time: {updateTime}</span>;
};

export default UpdateTime;

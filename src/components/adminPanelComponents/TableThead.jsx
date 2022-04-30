const TableThead = (props) => {
  const { title } = props;
  return (
    <thead className='flex w-full text-white rounded-t-lg bg-gray-50 dark:bg-slate-800'>
      <tr className='flex w-full mb-2'>
        {title.map((title) => (
          <th
            className='w-1/4 p-2 text-xs text-gray-500 uppercase dark:text-slate-600'
            key={title.toString()}
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableThead;

const {ApplicationLayout} = miniComponents;

const BaseExample = ()=>{
  return <ApplicationLayout
    showToolBar
    header={{
      title: '我的',
      back: null
    }}
  >
    ApplicationLayout
  </ApplicationLayout>;
};

render(<BaseExample />);

const {default: ApplicationLayout} = _ApplicationLayout;

const BaseExample = () => {
  return <ApplicationLayout
    showToolBar
    header={{
      title: '我的',
      back: null
    }}>
    BaseExample
  </ApplicationLayout>;
};

render(<BaseExample/>);

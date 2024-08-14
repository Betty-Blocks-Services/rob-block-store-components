(() => ({
  name: 'SpeedDial Item',
  type: 'SPEED_DIAL_ITEM',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { SpeedDialAction } = window.MaterialUI.Lab;
    const { icon, label, dataComponentAttribute } = options;
    const { isTooltipVisible, tooltipPlacement, handleClose, open } = parent;
    const { useText, Icon } = B;
    const labelText = useText(label);

    const onClick = (event) => {
      const { type } = event;
      if (type === 'click') B.triggerEvent('Click');
      handleClose(event);
    };

    const speedDialItemCmp = (
      <SpeedDialAction
        key={labelText}
        icon={<Icon name={icon} />}
        open={open}
        tooltipTitle={labelText}
        tooltipOpen={isTooltipVisible}
        tooltipPlacement={tooltipPlacement}
        onClick={onClick}
        classes={{
          fab: classes.fab,
          staticTooltipLabel: classes.staticTooltipLabel,
        }}
        data-component={useText(dataComponentAttribute)}
      />
    );

    return speedDialItemCmp;
  })(),
  styles: (B) => (t) => {
    const { Styling } = B;
    const style = new Styling(t);
    return {
      fab: {
        color: ({ options: { iconColor } }) => [
          style.getColor(iconColor),
          '!important',
        ],
      },
      staticTooltipLabel: {
        color: ({ options: { textColor } }) => [
          style.getColor(textColor),
          '!important',
        ],
      },
    };
  },
}))();

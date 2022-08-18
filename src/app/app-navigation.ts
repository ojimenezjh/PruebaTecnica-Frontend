export const navigation = [
  {
    text: 'Responsables',
    path: '/managers',
    icon: 'user'
  },
  {
    text: 'Empleats',
    path: '/employees',
    icon: 'group'
  },
  {
    text: 'Solicituds',
    icon: 'folder',
    items: [
      {
        text: 'Personalitzades',
        path: '/custom-requests'
      },
      {
        text: 'Remuneració',
        path: '/salary-requests'
      },
      {
        text: 'Vacances',
        path: '/vacation-requests'
      }
    ]
  }
];

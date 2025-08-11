export type Service = {
  title: string;
  subtitle: string;
  icon: string;
  routerLink: string;
  image: string;
};

export const servicesItems: Service[] = [
  {
    title: 'Rotinas de trabalho',
    subtitle: 'Acesse e valide as rotinas de trabalho',
    icon: 'pi pi-box',
    routerLink: '/app/aprovacoes/rotinas-de-trabalho',
    image: '/assets/images/work.png',
  },
];

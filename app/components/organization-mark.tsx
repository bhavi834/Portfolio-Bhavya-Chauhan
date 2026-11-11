import Image from 'next/image';

const marks = {
  grid: { src: '/logos/grid.webp', width: 356, height: 120, name: 'Grid Apps LLC', size: '134px' },
  ongc: { src: '/logos/ongc.webp', width: 96, height: 94, name: 'ONGC Ltd', size: '44px' },
  manipal: { src: '/logos/manipal.webp', width: 456, height: 91, name: 'Manipal University Jaipur', size: '220px' },
  iaeste: { src: '/logos/iaeste.webp', width: 320, height: 98, name: 'IAESTE', size: '110px' },
};

export function OrganizationMark({ organization }: { organization: keyof typeof marks }) {
  const mark = marks[organization];
  return <span className={`organization-mark organization-${organization}`}><Image src={mark.src} width={mark.width} height={mark.height} alt={mark.name} sizes={mark.size} /></span>;
}

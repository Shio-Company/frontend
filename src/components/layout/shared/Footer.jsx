import logo from '../../../assets/logo/logo.svg';
import { NewsletterBand } from '../../ui/ShioDesign';

const columns = [
  {
    title: 'Company',
    links: ['About', 'Features', 'Works', 'Career'],
  },
  {
    title: 'Help',
    links: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'],
  },
  {
    title: 'FAQ',
    links: ['Account', 'Manage Deliveries', 'Orders', 'Payments'],
  },
  {
    title: 'Resources',
    links: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'],
  },
];

function PaymentBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-3 md:justify-end">
      <span className="flex h-7 w-11 items-center justify-center rounded bg-white text-[11px] font-black italic text-[#1a1f71] shadow-sm">VISA</span>
      <span className="relative flex h-7 w-11 items-center justify-center overflow-hidden rounded bg-white shadow-sm">
        <span className="absolute left-2 h-4 w-4 rounded-full bg-[#eb001b]" />
        <span className="absolute right-2 h-4 w-4 rounded-full bg-[#f79e1b] mix-blend-multiply" />
      </span>
      <span className="flex h-7 w-11 items-center justify-center rounded bg-white text-[10px] font-bold italic text-[#003087] shadow-sm">PayPal</span>
      <span className="flex h-7 w-11 items-center justify-center rounded bg-white text-[10px] font-bold text-black shadow-sm">Pay</span>
      <span className="flex h-7 w-11 items-center justify-center rounded bg-white text-[10px] font-bold text-[#4285f4] shadow-sm">G Pay</span>
    </div>
  );
}

export default function Footer({ showNewsletter = true }) {
  return (
    <footer className="bg-[#f0f0f0] font-maginia text-black">
      {showNewsletter && (
        <div className="-translate-y-1/2">
          <NewsletterBand />
        </div>
      )}

      <div className={`mx-auto max-w-[1240px] px-6 pb-10 ${showNewsletter ? '-mt-8 pt-8' : 'pt-24'}`}>
        <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
          <div className="flex items-start justify-center lg:justify-start">
            <img src={logo} alt="Shio Logo" className="h-auto w-[190px]" />
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-6 text-[13px] font-bold uppercase tracking-[0.22em]">{column.title}</h3>
                <ul className="space-y-4 text-[14px] text-black/50">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="transition hover:text-black">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-black/10 pt-5">
          <PaymentBadges />
        </div>
      </div>
    </footer>
  );
}

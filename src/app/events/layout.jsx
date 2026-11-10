import './events.css';

export const metadata = {
  title: 'Operations Board // Events — AI CLUB',
  description:
    'Flagship hackathons, low-level hardware acceleration workshops, and algorithmic code sprints organized by AI Club cohorts at MITS Gwalior.',
};

export default function EventsLayout({ children }) {
  return (
    <div className="events-page">
      {children}
    </div>
  );
}


export default function Header() {
  return (
    <header
      style={{
        backgroundColor: '#16202366',
        width: '100%',
        height: '70px',
        padding: '20px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(44px)',
      }}
      className="relative z-20"
    >
      <img
        src="/logo.svg"
        alt="Logo"
        style={{ height: 22, width: 'auto', display: 'block' }}
      />
    </header>
  );
}

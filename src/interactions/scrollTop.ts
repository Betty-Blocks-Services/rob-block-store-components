function scrollTop({ event }: { event: Event }): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
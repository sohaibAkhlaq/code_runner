import { Component, OnInit, OnDestroy, signal, inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
  color: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  typedCode   = signal('');
  mouseX      = signal(0);
  mouseY      = signal(0);
  counterDone = signal(false);

  private typingTimeout: ReturnType<typeof setTimeout> | null = null;
  private animFrame: number = 0;
  private particles: Particle[] = [];
  private ctx!: CanvasRenderingContext2D | null;

  get lineNumbers(): number[] {
    return Array.from({ length: this.fullCode.split('\n').length }, (_, i) => i + 1);
  }

  readonly fullCode = `// MEAN Stack - TypeScript Solution ✨
class Solution {
  twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      if (map.has(complement))
        return [map.get(complement)!, i];
      map.set(nums[i], i);
    }
    return [];
  }
}

// Runtime: 45ms · Memory: 38.2MB · Beats 97% ✅`;

  features = [
    {
      id: 1, icon: '⚡', title: 'Lightning Execution',
      description: 'Distributed execution engine runs your code in under 45ms with auto-scaling containers.',
      color: '#F59E0B', accent: 'rgba(245,158,11,0.08)'
    },
    {
      id: 2, icon: '🌐', title: 'Multi-Language Support',
      description: 'TypeScript, JavaScript, Python, Java, C++, Go — all with syntax highlighting & IntelliSense.',
      color: '#06B6D4', accent: 'rgba(6,182,212,0.08)'
    },
    {
      id: 3, icon: '🧠', title: 'AI-Powered Hints',
      description: 'Intelligent suggestions that analyze your approach and guide you toward optimal solutions.',
      color: '#D946EF', accent: 'rgba(217,70,239,0.08)'
    },
    {
      id: 4, icon: '📊', title: 'Progress Analytics',
      description: 'Track your streak, acceptance rate, and ranking with real-time Firebase-powered dashboards.',
      color: '#10B981', accent: 'rgba(16,185,129,0.08)'
    },
    {
      id: 5, icon: '🏆', title: 'Live Leaderboard',
      description: 'Compete globally. Real-time rankings powered by WebSocket connections and MongoDB aggregation.',
      color: '#818CF8', accent: 'rgba(129,140,248,0.08)'
    },
    {
      id: 6, icon: '🔒', title: 'Secure Sandboxing',
      description: 'Every submission runs in an isolated Docker container — no resource abuse, full security.',
      color: '#F43F5E', accent: 'rgba(244,63,94,0.08)'
    },
  ];

  stats = [
    { value: 0, display: '50K+',  label: 'Active Developers', target: 50 },
    { value: 0, display: '1M+',   label: 'Submissions Run',   target: 1000 },
    { value: 0, display: '99.9%', label: 'Platform Uptime',   target: 100 },
    { value: 0, display: '45ms',  label: 'Avg Execution',     target: 45 },
  ];

  techStack = [
    { name: 'MongoDB',  color: '#00ED64', icon: '🍃' },
    { name: 'Express',  color: '#888',    icon: '⚡' },
    { name: 'Angular',  color: '#DD0031', icon: '🅰' },
    { name: 'Node.js',  color: '#339933', icon: '⬡'  },
    { name: 'TypeScript', color: '#3178C6', icon: '📘' },
    { name: 'Docker',   color: '#2496ED', icon: '🐳' },
  ];

  testimonials = [
    { name: 'Sarah K.',   role: 'Frontend Engineer &#64; Google',    text: 'CodeRunner helped me crack Google L5. The AI hints are 🔥', avatar: 'SK' },
    { name: 'Raza M.',    role: 'SWE Intern &#64; Microsoft',         text: 'Best coding platform I have used. Clean UI, fast execution.', avatar: 'RM' },
    { name: 'Ana C.',     role: 'Full Stack Dev &#64; Meta',          text: 'The MEAN stack integration is seamless. Love the real-time features!', avatar: 'AC' },
  ];

  ngOnInit(): void {
    this.startTypingAnimation();
  }

  ngAfterViewInit(): void {
    this.initParticles();
  }

  ngOnDestroy(): void {
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    cancelAnimationFrame(this.animFrame);
  }

  onMouseMove(e: MouseEvent): void {
    this.mouseX.set(e.clientX / window.innerWidth);
    this.mouseY.set(e.clientY / window.innerHeight);
  }

  get heroTransform(): string {
    const dx = (this.mouseX() - 0.5) * 8;
    const dy = (this.mouseY() - 0.5) * 8;
    return `perspective(1200px) rotateY(${-dx}deg) rotateX(${dy}deg)`;
  }

  private startTypingAnimation(): void {
    let index = 0;
    const type = () => {
      if (index < this.fullCode.length) {
        this.typedCode.set(this.fullCode.substring(0, index + 1));
        index++;
        this.typingTimeout = setTimeout(type, index < 40 ? 25 : 18);
      }
    };
    this.typingTimeout = setTimeout(type, 1000);
  }

  private initParticles(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    this.ctx = canvas.getContext('2d');
    this.resizeCanvas();

    const colors = ['#6366F1', '#818CF8', '#A855F7', '#06B6D4', '#10B981'];
    for (let i = 0; i < 60; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    this.drawParticles();
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private drawParticles(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas || !this.ctx) return;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of this.particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width)  p.x = 0;
      if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2,'0');
      this.ctx.fill();
    }

    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(99,102,241,${0.06 * (1 - dist/120)})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }

    this.animFrame = requestAnimationFrame(() => this.drawParticles());
  }
}

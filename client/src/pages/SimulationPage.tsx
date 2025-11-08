
import { Button } from "@/components/ui/button";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function SimulationPage() {
  const [, setLocation] = useLocation();
  const { language } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [userChoice, setUserChoice] = useState<string | null>(null);

  const steps = language === 'zh' ? [
    {
      type: 'sms' as const,
      title: "收到可疑短信",
      description: "你收到一条声称来自银行的短信",
      sender: "DBS Bank",
      message: "尊敬的客户，您的账户出现异常活动。请立即点击链接验证：http://dbs-verify.com/secure",
      choices: [
        { text: "点击链接", correct: false },
        { text: "直接访问银行官网", correct: true },
        { text: "回复短信询问", correct: false }
      ]
    },
    {
      type: 'call' as const,
      title: "接到可疑电话",
      description: "一个陌生号码打来自称是警察",
      caller: "+65 6123 4567",
      callerName: "新加坡警察局",
      message: "你好，我是李警官。你的身份证被用于犯罪活动。请立即配合调查。",
      choices: [
        { text: "立即配合", correct: false },
        { text: "挂断并用官方号码回拨", correct: true },
        { text: "询问对方警员编号", correct: false }
      ]
    },
    {
      type: 'app' as const,
      title: "弹出窗口要求安装应用",
      description: "手机突然弹出安全警告",
      appName: "安全中心",
      message: "检测到病毒！立即安装安全应用保护您的设备。",
      choices: [
        { text: "立即安装", correct: false },
        { text: "关闭弹窗", correct: true },
        { text: "点击了解更多", correct: false }
      ]
    },
    {
      type: 'otp' as const,
      title: "要求提供验证码",
      description: "对方要求你提供手机收到的验证码",
      sender: "银行客服",
      message: "为了验证您的身份，请提供刚收到的6位验证码。",
      otpCode: "123456",
      choices: [
        { text: "提供验证码", correct: false },
        { text: "拒绝并挂断", correct: true },
        { text: "只说前3位数字", correct: false }
      ]
    }
  ] : language === 'ms' ? [
    {
      type: 'sms' as const,
      title: "Terima SMS Mencurigakan",
      description: "Anda terima SMS yang mendakwa dari bank",
      sender: "DBS Bank",
      message: "Pelanggan yang dihormati, akaun anda ada aktiviti luar biasa. Sila klik pautan untuk sahkan: http://dbs-verify.com/secure",
      choices: [
        { text: "Klik pautan", correct: false },
        { text: "Lawat laman web bank terus", correct: true },
        { text: "Balas SMS tanya", correct: false }
      ]
    },
    {
      type: 'call' as const,
      title: "Terima Panggilan Mencurigakan",
      description: "Nombor tidak dikenali hubungi mendakwa polis",
      caller: "+65 6123 4567",
      callerName: "Polis Singapura",
      message: "Hello, saya Pegawai Lee. IC anda digunakan dalam jenayah. Sila kerjasama segera.",
      choices: [
        { text: "Kerjasama segera", correct: false },
        { text: "Tutup dan hubungi nombor rasmi", correct: true },
        { text: "Tanya nombor pegawai", correct: false }
      ]
    },
    {
      type: 'app' as const,
      title: "Pop-up Minta Pasang Aplikasi",
      description: "Telefon tiba-tiba ada amaran keselamatan",
      appName: "Pusat Keselamatan",
      message: "Virus dikesan! Pasang aplikasi keselamatan sekarang untuk lindungi peranti anda.",
      choices: [
        { text: "Pasang segera", correct: false },
        { text: "Tutup pop-up", correct: true },
        { text: "Klik untuk tahu lebih", correct: false }
      ]
    },
    {
      type: 'otp' as const,
      title: "Minta Berikan Kod Pengesahan",
      description: "Mereka minta anda berikan kod yang diterima",
      sender: "Perkhidmatan Bank",
      message: "Untuk sahkan identiti, sila berikan kod 6 digit yang baru diterima.",
      otpCode: "123456",
      choices: [
        { text: "Berikan kod", correct: false },
        { text: "Tolak dan tutup telefon", correct: true },
        { text: "Cuma sebut 3 digit", correct: false }
      ]
    }
  ] : [
    {
      type: 'sms' as const,
      title: "Suspicious SMS Received",
      description: "You receive an SMS claiming to be from your bank",
      sender: "DBS Bank",
      message: "Dear customer, unusual activity detected on your account. Click here to verify immediately: http://dbs-verify.com/secure",
      choices: [
        { text: "Click the link", correct: false },
        { text: "Go to official bank website", correct: true },
        { text: "Reply to SMS", correct: false }
      ]
    },
    {
      type: 'call' as const,
      title: "Suspicious Phone Call",
      description: "Unknown number calls claiming to be police",
      caller: "+65 6123 4567",
      callerName: "Singapore Police",
      message: "Hello, I'm Officer Lee. Your IC has been used in criminal activity. Please cooperate immediately.",
      choices: [
        { text: "Cooperate immediately", correct: false },
        { text: "Hang up and call official number", correct: true },
        { text: "Ask for badge number", correct: false }
      ]
    },
    {
      type: 'app' as const,
      title: "Pop-up Requesting App Install",
      description: "Your phone shows a security warning",
      appName: "Security Center",
      message: "Virus detected! Install security app now to protect your device.",
      choices: [
        { text: "Install now", correct: false },
        { text: "Close pop-up", correct: true },
        { text: "Learn more", correct: false }
      ]
    },
    {
      type: 'otp' as const,
      title: "Request for OTP Code",
      description: "They ask you to provide the code you received",
      sender: "Bank Service",
      message: "To verify your identity, please provide the 6-digit code you just received.",
      otpCode: "123456",
      choices: [
        { text: "Provide the code", correct: false },
        { text: "Refuse and hang up", correct: true },
        { text: "Only say first 3 digits", correct: false }
      ]
    }
  ];

  const handleChoice = (choiceIndex: number) => {
    const step = steps[currentStep];
    const choice = step.choices[choiceIndex];
    setUserChoice(choice.correct ? 'correct' : 'wrong');
    
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        setUserChoice(null);
      } else {
        setIsComplete(true);
      }
    }, 2000);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsComplete(false);
    setUserChoice(null);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  if (isComplete) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-12 text-center">
          <div className="text-8xl mb-6">🛡️</div>
          <h1 className="text-4xl font-bold mb-4">
            {language === 'zh' ? '模拟完成！' : language === 'ms' ? 'Simulasi Selesai!' : 'Simulation Complete!'}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {language === 'zh' 
              ? '你现在知道如何识别和应对诈骗了。记住：永远保持警惕！'
              : language === 'ms'
              ? 'Anda kini tahu cara kenal dan tangani penipuan. Ingat: Sentiasa berwaspada!'
              : 'You now know how to identify and respond to scams. Remember: Stay alert!'}
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={handleRestart} className="gap-2">
              <RotateCcw className="w-5 h-5" />
              {language === 'zh' ? '重新开始' : language === 'ms' ? 'Mula Semula' : 'Start Over'}
            </Button>
            <Button size="lg" variant="outline" onClick={() => setLocation('/quiz')}>
              {language === 'zh' ? '测试知识' : language === 'ms' ? 'Uji Pengetahuan' : 'Test Knowledge'}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="px-4 py-8 min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto mb-8">
        <Button variant="ghost" onClick={() => setLocation('/')} className="mb-4">
          <ChevronLeft className="w-5 h-5 mr-2" />
          {language === 'zh' ? '返回' : language === 'ms' ? 'Kembali' : 'Back'}
        </Button>
        <h1 className="text-4xl font-bold mb-2">
          {language === 'zh' ? '真实场景模拟' : language === 'ms' ? 'Simulasi Senario Sebenar' : 'Real Scenario Simulation'}
        </h1>
        <p className="text-xl text-muted-foreground">
          {language === 'zh' ? '体验真实的诈骗场景并学习正确应对' : language === 'ms' ? 'Alami senario penipuan sebenar dan belajar respons yang betul' : 'Experience real scam scenarios and learn the right response'}
        </p>
      </div>

      <Progress value={progress} className="mb-6 h-2 max-w-4xl mx-auto" />

      <div className="max-w-md mx-auto">
        {/* Phone Screen Container */}
        <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
          {/* Phone Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10"></div>
          
          {/* Phone Screen */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden min-h-[600px]">
            {/* Status Bar */}
            <div className="bg-gray-100 px-6 py-2 flex justify-between items-center text-xs">
              <span>9:41</span>
              <div className="flex gap-1">
                <span>📶</span>
                <span>📡</span>
                <span>🔋</span>
              </div>
            </div>

            {/* Screen Content */}
            <div className="p-6">
              {step.type === 'sms' && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-2">💬</div>
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  
                  <Card className="p-4 bg-green-50 border-green-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
                        {step.sender[0]}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm mb-1">{step.sender}</div>
                        <div className="bg-white rounded-2xl rounded-tl-none p-3 text-sm">
                          {step.message}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Just now</div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {step.type === 'call' && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-2 animate-pulse">📞</div>
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  
                  <Card className="p-6 text-center space-y-4">
                    <div className="text-xl font-semibold">{step.callerName}</div>
                    <div className="text-muted-foreground">{step.caller}</div>
                    <div className="bg-muted p-4 rounded-lg text-sm italic">
                      "{step.message}"
                    </div>
                  </Card>
                </div>
              )}

              {step.type === 'app' && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-2">⚠️</div>
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  
                  <Card className="p-6 text-center space-y-4 border-red-300 bg-red-50">
                    <div className="text-4xl">🛡️</div>
                    <div className="text-xl font-bold text-red-600">{step.appName}</div>
                    <div className="text-sm">{step.message}</div>
                    <Button className="w-full bg-red-600 hover:bg-red-700" size="lg">
                      {language === 'zh' ? '立即安装' : language === 'ms' ? 'Pasang Sekarang' : 'Install Now'}
                    </Button>
                  </Card>
                </div>
              )}

              {step.type === 'otp' && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-2">🔢</div>
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  
                  <Card className="p-4 bg-blue-50 border-blue-200 mb-4">
                    <div className="text-xs text-muted-foreground mb-2">SMS from Bank</div>
                    <div className="font-mono text-2xl font-bold text-center tracking-widest">
                      {step.otpCode}
                    </div>
                    <div className="text-xs text-center text-muted-foreground mt-2">
                      {language === 'zh' ? '验证码5分钟内有效' : language === 'ms' ? 'Kod sah 5 minit' : 'Code valid for 5 minutes'}
                    </div>
                  </Card>

                  <Card className="p-4 bg-green-50">
                    <div className="text-sm italic">
                      "{step.message}"
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">- {step.sender}</div>
                  </Card>
                </div>
              )}

              {/* Choices */}
              <div className="mt-8 space-y-3">
                <div className="text-sm font-semibold mb-3">
                  {language === 'zh' ? '你会怎么做？' : language === 'ms' ? 'Apa yang anda akan buat?' : 'What would you do?'}
                </div>
                {step.choices.map((choice, index) => (
                  <Button
                    key={index}
                    onClick={() => handleChoice(index)}
                    disabled={userChoice !== null}
                    variant={
                      userChoice === 'correct' && choice.correct ? 'default' :
                      userChoice === 'wrong' && !choice.correct ? 'destructive' :
                      'outline'
                    }
                    className="w-full justify-start text-left h-auto py-4"
                    size="lg"
                  >
                    {choice.text}
                  </Button>
                ))}
              </div>

              {/* Feedback */}
              {userChoice && (
                <Card className={`mt-4 p-4 ${userChoice === 'correct' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{userChoice === 'correct' ? '✅' : '❌'}</span>
                    <span className="font-semibold">
                      {userChoice === 'correct' 
                        ? (language === 'zh' ? '正确！' : language === 'ms' ? 'Betul!' : 'Correct!')
                        : (language === 'zh' ? '错误！' : language === 'ms' ? 'Salah!' : 'Wrong!')}
                    </span>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

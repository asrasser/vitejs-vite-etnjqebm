// @ts-nocheck
import React, { useState } from 'react';
import { Heart, Search, Loader2, Plus, X } from 'lucide-react';

// قاعدة بيانات المتبرعين المبدئية
const initialDonors = [
  { id: 1, name: "قيس طارق", bloodType: "O+" },
  { id: 2, name: "أبو عائشة", bloodType: "A+" },
  { id: 3, name: "إبراهيم إبراهيم", bloodType: "B+" },
  { id: 4, name: "إياد عبدالعال", bloodType: "AB+" },
  { id: 5, name: "مصطفى أنس", bloodType: "O-" },
  { id: 6, name: "أحمد الأشب", bloodType: "A-" },
  { id: 7, name: "أحمد عبدالسلام", bloodType: "B-" },
  { id: 8, name: "ماجد الأمين", bloodType: "A+" },
  { id: 9, name: "محمد أشرف", bloodType: "O+" },
  { id: 10, name: "غيث", bloodType: "AB-" },
  { id: 11, name: "أحمد أحمد محمد", bloodType: "O+" },
  { id: 12, name: "علي الفتوري", bloodType: "B+" },
  { id: 13, name: "مختار", bloodType: "A+" },
  { id: 14, name: "سليم صلاح الدين", bloodType: "O-" },
  { id: 15, name: "هيثم عبدالمجيد", bloodType: "AB+" },
  { id: 16, name: "عبدالرحمن أحمد", bloodType: "A-" },
  { id: 17, name: "علي عبدالحكيم", bloodType: "B+" },
  { id: 18, name: "نصر الدين عصيم", bloodType: "O+" },
  { id: 19, name: "سند علي", bloodType: "A+" }
];

const bloodTypesList = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

export default function App() {
  const [donors, setDonors] = useState(initialDonors);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  
  // حالات نافذة الإضافة (Modal)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDonorName, setNewDonorName] = useState("");
  const [newDonorAge, setNewDonorAge] = useState("");
  const [newDonorBloodType, setNewDonorBloodType] = useState("");
  const [formError, setFormError] = useState("");

  const handleSearch = () => {
    if (isLoading || !searchTerm.trim()) return;
    
    // تشغيل الأنيميشن الخاص بالتحميل
    setIsLoading(true);
    
    // تأخير إظهار النتائج لمدة ثانية 
    setTimeout(() => {
      const filtered = donors.filter((donor) => {
        const cleanSearchTerm = searchTerm.replace(/\s+/g, '').toLowerCase();
        const cleanBloodType = donor.bloodType.replace(/\s+/g, '').toLowerCase();
        // نبحث عما إذا كانت فصيلة الدم تحتوي على النص المدخل
        return cleanBloodType.includes(cleanSearchTerm);
      });
      
      setSearchResults(filtered);
      setHasSearched(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleAddDonor = () => {
    // التحقق من تعبئة الحقول
    if (!newDonorName.trim() || !newDonorAge.trim() || !newDonorBloodType) {
      setFormError("الرجاء تعبئة جميع الحقول واختيار الفصيلة.");
      return;
    }
    
    // إنشاء كائن للمتبرع الجديد
    const newDonor = {
      id: donors.length > 0 ? Math.max(...donors.map(d => d.id)) + 1 : 1,
      name: newDonorName,
      bloodType: newDonorBloodType,
      age: newDonorAge
    };
    
    // إضافته للقائمة (في البداية) وإغلاق النافذة
    setDonors([newDonor, ...donors]);
    setIsModalOpen(false);
    setNewDonorName("");
    setNewDonorAge("");
    setNewDonorBloodType("");
    setFormError("");
  };

  return (
    <>
      {/* تضمين خط Cairo وفرضه على جميع العناصر لضمان السماكة المطلوبة */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
        * {
          font-family: 'Cairo', sans-serif !important;
        }
      `}} />

      <div dir="rtl" className="min-h-screen relative flex flex-col" style={{ backgroundColor: '#fdfbfb', backgroundImage: 'linear-gradient(120deg, #fdfbfb 0%, #f9f5f6 100%)' }}>
        
        {/* شكل زخرفي في الخلفية */}
        <div className="fixed bottom-0 left-0 w-full z-[0] pointer-events-none opacity-40">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
              <path fill="#fce4e4" fillOpacity="1" d="M0,256L48,245.3C96,235,192,213,288,218.7C384,224,480,256,576,256C672,256,768,224,864,197.3C960,171,1056,149,1152,154.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        {/* شريط التنقل (Header) */}
        <header className="container mx-auto px-6 lg:px-12 py-6 flex justify-between items-center z-10">
          <div className="flex items-center gap-3 text-red-500 cursor-pointer hover:scale-105 transition-transform">
            <Heart size={32} fill="currentColor" />
            <span className="font-extrabold text-2xl tracking-wide text-gray-800">رابطة الفصائل</span>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 px-6 rounded-full transition-all duration-300 shadow-md flex items-center gap-2"
          >
            <Plus size={20} strokeWidth={3} />
            <span>إضافة فصيلة دم</span>
          </button>
        </header>

        {/* المحتوى الرئيسي */}
        <main className="container mx-auto px-4 flex-grow flex flex-col items-center mt-12 z-10 pb-20">
          
          {/* العناوين */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1f36] mb-6 leading-tight">
              قطرة دم واحدة قد تنقذ حياة
            </h1>
            <p className="text-gray-500 text-lg md:text-xl font-bold px-4">
              منصة تجمع المتبرعين والمحتاجين للدم في مكان واحد بسرعة وسهولة
            </p>
          </div>

          {/* شريط البحث */}
          <div className="w-full max-w-3xl mb-12 px-4">
            <div className="bg-white rounded-full p-2 flex items-center shadow-[0_10px_40px_-10px_rgba(229,57,70,0.15)] focus-within:ring-2 focus-within:ring-red-300 transition-all">
              <div className="flex-grow flex items-center px-4">
                <Search className="text-gray-400 ml-3" size={24} />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="ادخل فصيلة دمك (مثال: A+, O-)..." 
                  className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 font-bold text-lg px-2"
                  dir="rtl"
                />
              </div>
              <button 
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-600 text-white font-bold text-xl py-3 w-32 flex justify-center items-center rounded-full transition-colors flex-shrink-0 shadow-sm disabled:opacity-80"
              >
                {isLoading ? <Loader2 className="animate-spin" size={28} /> : "بحث"}
              </button>
            </div>
          </div>

          {/* التبديل بين البطاقات الإحصائية ونتائج البحث بناءً على حالة البحث */}
          {!hasSearched ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl px-4 mb-16">
              <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:-translate-y-2 transition-transform duration-300 border border-gray-50 cursor-pointer">
                <h2 className="text-red-500 font-black text-5xl mb-3">+O</h2>
                <p className="text-gray-400 font-bold text-base">الأكثر طلباً</p>
              </div>
              <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:-translate-y-2 transition-transform duration-300 border border-gray-50 cursor-pointer">
                <h2 className="text-red-500 font-black text-5xl mb-3">-A</h2>
                <p className="text-gray-400 font-bold text-base">متبرع متوفر</p>
              </div>
              <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:-translate-y-2 transition-transform duration-300 border border-gray-50 cursor-pointer">
                <h2 className="text-red-500 font-black text-5xl mb-3">+AB</h2>
                <p className="text-gray-400 font-bold text-base">مستقبل عام</p>
              </div>
              <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:-translate-y-2 transition-transform duration-300 border border-gray-50 cursor-pointer">
                <h2 className="text-red-500 font-black text-5xl mb-3">-O</h2>
                <p className="text-gray-400 font-bold text-base">مانح عام</p>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-4xl px-4 flex flex-col gap-4 mb-16">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-700">
                  نتائج البحث عن: <span className="text-red-500" dir="ltr">{searchTerm}</span>
                  <span className="text-base font-semibold text-gray-500 mr-3">({searchResults.length} متبرع)</span>
                </h3>
                
                {/* زر العودة */}
                <button 
                  onClick={() => {
                    setHasSearched(false);
                    setSearchTerm("");
                  }}
                  className="text-base text-gray-500 hover:text-red-500 font-bold flex items-center gap-2 transition-colors"
                >
                  عودة
                </button>
              </div>

              {searchResults.length > 0 ? (
                searchResults.map((donor) => (
                  <div 
                    key={donor.id} 
                    className="flex items-center justify-between bg-white px-6 py-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    {/* الجزء الأيمن: الفصيلة والاسم مع فاصل عمودي */}
                    <div className="flex items-center">
                      <div className="w-16 flex justify-center">
                        <span className="text-orange-500 font-black text-2xl lg:text-3xl" dir="ltr">
                          {donor.bloodType}
                        </span>
                      </div>
                      
                      {/* الخط الفاصل */}
                      <div className="w-px h-12 bg-gray-200 mx-4 lg:mx-6"></div>
                      
                      {/* اسم المتبرع */}
                      <span className="text-xl lg:text-2xl text-gray-800 font-bold">
                        {donor.name}
                      </span>
                    </div>

                    {/* الجزء الأيسر: زر التواصل */}
                    <button className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white border border-red-100 font-bold px-8 py-2.5 text-lg rounded-xl transition-colors duration-200 shadow-sm">
                      تواصل
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
                  <p className="text-gray-500 text-xl font-bold">لا يوجد متبرعين بهذه الفصيلة حالياً.</p>
                </div>
              )}
            </div>
          )}
        </main>

        {/* نافذة الإضافة (Modal) */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-all">
            <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl" dir="rtl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black text-gray-800">إضافة متبرع جديد</h2>
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormError("");
                  }} 
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={28} strokeWidth={2.5} />
                </button>
              </div>

              <div className="flex flex-col gap-5">
                {/* الفصيلة (مربعات) */}
                <div>
                  <label className="block text-gray-700 font-bold mb-3 text-lg">اختيار فصيلة الدم</label>
                  <div className="grid grid-cols-4 gap-3">
                    {bloodTypesList.map(type => (
                      <button
                        key={type}
                        onClick={() => {
                          setNewDonorBloodType(type);
                          setFormError(""); // مسح الخطأ بمجرد الاختيار
                        }}
                        className={`py-3 rounded-xl font-bold text-lg border-2 transition-all ${
                          newDonorBloodType === type 
                            ? 'border-red-500 bg-red-50 text-red-500 shadow-sm' 
                            : 'border-gray-200 text-gray-500 hover:border-red-300 hover:bg-red-50'
                        }`}
                        dir="ltr"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* الاسم */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2 text-lg">الاسم الثلاثي</label>
                  <input 
                    type="text"
                    value={newDonorName}
                    onChange={(e) => {
                      setNewDonorName(e.target.value);
                      setFormError("");
                    }}
                    placeholder="أدخل اسم المتبرع"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-red-200 transition-all"
                  />
                </div>

                {/* العمر */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2 text-lg">العمر</label>
                  <input 
                    type="number"
                    value={newDonorAge}
                    onChange={(e) => {
                      setNewDonorAge(e.target.value);
                      setFormError("");
                    }}
                    placeholder="مثال: 25"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-red-200 transition-all"
                  />
                </div>
                
                {/* رسالة الخطأ (تظهر عند النقص) */}
                {formError && (
                  <p className="text-red-500 font-bold text-sm mt-1">{formError}</p>
                )}
              </div>

              {/* أزرار الإجراءات */}
              <div className="flex gap-4 mt-8">
                <button 
                  onClick={handleAddDonor}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md text-lg"
                >
                  إضافة
                </button>
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormError("");
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition-colors text-lg"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

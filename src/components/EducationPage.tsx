import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Play, Clock, Star, CheckCircle, Award, Users } from 'lucide-react';

interface EducationPageProps {
  onBack: () => void;
}

const EducationPage: React.FC<EducationPageProps> = ({ onBack }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);

  const courses = [
    {
      id: 1,
      title: 'Basic Computer Skills',
      description: 'Learn fundamental computer operations, internet browsing, and basic software usage',
      duration: '2 weeks',
      level: 'Beginner',
      students: 1247,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=500',
      modules: [
        'Computer Basics',
        'Internet Navigation',
        'Email Usage',
        'Word Processing'
      ],
      skills: ['Computer Literacy', 'Internet Usage', 'Basic Software'],
      certificate: true,
      jobOpportunities: ['Data Entry', 'Virtual Assistant', 'Customer Service']
    },
    {
      id: 2,
      title: 'English Communication',
      description: 'Improve your English speaking, writing, and comprehension skills for better job opportunities',
      duration: '3 weeks',
      level: 'Beginner to Intermediate',
      students: 2156,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=500',
      modules: [
        'Basic Grammar',
        'Conversation Practice',
        'Business English',
        'Email Writing'
      ],
      skills: ['English Communication', 'Business Writing', 'Conversation'],
      certificate: true,
      jobOpportunities: ['Customer Service', 'Sales Representative', 'Teacher Assistant']
    },
    {
      id: 3,
      title: 'Mobile Phone Repair',
      description: 'Learn to diagnose and repair common mobile phone issues to start your own business',
      duration: '4 weeks',
      level: 'Beginner',
      students: 892,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1435560/pexels-photo-1435560.jpeg?auto=compress&cs=tinysrgb&w=500',
      modules: [
        'Phone Components',
        'Common Issues',
        'Repair Techniques',
        'Business Setup'
      ],
      skills: ['Technical Repair', 'Problem Solving', 'Entrepreneurship'],
      certificate: true,
      jobOpportunities: ['Phone Technician', 'Repair Shop Owner', 'Freelance Repair']
    },
    {
      id: 4,
      title: 'Basic Cooking & Food Safety',
      description: 'Learn essential cooking skills and food safety practices for restaurant or catering work',
      duration: '2 weeks',
      level: 'Beginner',
      students: 1534,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/1209029/pexels-photo-1209029.jpeg?auto=compress&cs=tinysrgb&w=500',
      modules: [
        'Kitchen Basics',
        'Food Safety',
        'Basic Recipes',
        'Hygiene Standards'
      ],
      skills: ['Cooking', 'Food Safety', 'Kitchen Management'],
      certificate: true,
      jobOpportunities: ['Kitchen Assistant', 'Food Service Worker', 'Catering Helper']
    },
    {
      id: 5,
      title: 'Tailoring & Sewing',
      description: 'Master basic tailoring and sewing skills to create income through clothing alterations and creation',
      duration: '3 weeks',
      level: 'Beginner',
      students: 967,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3738087/pexels-photo-3738087.jpeg?auto=compress&cs=tinysrgb&w=500',
      modules: [
        'Sewing Basics',
        'Pattern Reading',
        'Alterations',
        'Business Planning'
      ],
      skills: ['Tailoring', 'Pattern Making', 'Hand-Eye Coordination'],
      certificate: true,
      jobOpportunities: ['Tailor', 'Alterations Specialist', 'Fashion Designer Assistant']
    },
    {
      id: 6,
      title: 'Digital Marketing Basics',
      description: 'Learn social media marketing and online business promotion to help local businesses',
      duration: '2 weeks',
      level: 'Beginner',
      students: 743,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=500',
      modules: [
        'Social Media Basics',
        'Content Creation',
        'Online Promotion',
        'Analytics'
      ],
      skills: ['Digital Marketing', 'Social Media', 'Content Creation'],
      certificate: true,
      jobOpportunities: ['Social Media Assistant', 'Marketing Helper', 'Content Creator']
    }
  ];

  const handleEnroll = (courseId: number) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
      alert('Successfully enrolled! You can now access the course materials.');
    }
  };

  const handleStartCourse = (courseId: number) => {
    alert('Course started! In a real implementation, this would open the first lesson.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center">
              <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Education & Skills Training</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedCourse ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Bridge the Education Gap
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Access free, practical courses designed to provide valuable skills and create job opportunities. 
                All courses are taught by verified instructors and include certificates upon completion.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <Award className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Certified Courses</h3>
                  <p className="text-gray-600 text-sm">Get recognized certificates to boost your job applications</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Expert Instructors</h3>
                  <p className="text-gray-600 text-sm">Learn from verified professionals with real-world experience</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Job Ready Skills</h3>
                  <p className="text-gray-600 text-sm">Skills directly connected to available job opportunities</p>
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="relative h-48">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                        {course.level}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                        <span className="text-xs font-medium">{course.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{course.description}</p>

                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.students.toLocaleString()} students
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2 text-sm">You'll learn:</h4>
                      <div className="flex flex-wrap gap-1">
                        {course.skills.slice(0, 2).map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {course.skills.length > 2 && (
                          <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded-full text-xs">
                            +{course.skills.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transform hover:scale-[1.02] transition-all duration-200"
                    >
                      View Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Course Detail View */
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedCourse(null)}
              className="flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </button>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-64 md:h-80">
                <img
                  src={selectedCourse.image}
                  alt={selectedCourse.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <button className="bg-white bg-opacity-20 backdrop-blur-sm border-2 border-white rounded-full p-4 hover:bg-opacity-30 transition-all">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </button>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedCourse.title}</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {selectedCourse.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {selectedCourse.students.toLocaleString()} enrolled
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" />
                        {selectedCourse.rating}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {enrolledCourses.includes(selectedCourse.id) ? (
                      <button
                        onClick={() => handleStartCourse(selectedCourse.id)}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        Continue Learning
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEnroll(selectedCourse.id)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                      >
                        Enroll for Free
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {selectedCourse.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Course Modules</h3>
                    <div className="space-y-3">
                      {selectedCourse.modules.map((module, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm mr-3">
                            {index + 1}
                          </div>
                          <span className="font-medium text-gray-900">{module}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Skills You'll Gain</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCourse.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Job Opportunities</h3>
                      <div className="space-y-2">
                        {selectedCourse.jobOpportunities.map((job, index) => (
                          <div key={index} className="flex items-center text-gray-700">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            {job}
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedCourse.certificate && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <Award className="w-5 h-5 text-yellow-600 mr-2" />
                          <h4 className="font-medium text-yellow-800">Certificate Included</h4>
                        </div>
                        <p className="text-sm text-yellow-700 mt-1">
                          Earn a certificate upon successful completion to enhance your job applications
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationPage;
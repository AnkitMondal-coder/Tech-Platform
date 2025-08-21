import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, DollarSign, Star, Building2, Search, Filter } from 'lucide-react';

interface JobsPageProps {
  onBack: () => void;
}

const JobsPage: React.FC<JobsPageProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

  const jobs = [
    {
      id: 1,
      title: 'Data Entry Clerk',
      company: 'TechFlow Solutions',
      location: 'Remote',
      type: 'Part-time',
      hourlyRate: '$12-15',
      hours: '15-20 hrs/week',
      skills: ['Computer Skills', 'Attention to Detail', 'Excel'],
      description: 'Enter data accurately into spreadsheets and databases. Perfect for those with basic computer skills.',
      requirements: ['Basic computer skills', 'Reliable internet', 'English proficiency'],
      rating: 4.7,
      verified: true,
      urgent: false,
      remote: true,
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'Customer Service Representative',
      company: 'Global Connect',
      location: 'Lagos, Nigeria',
      type: 'Part-time',
      hourlyRate: '$8-12',
      hours: '20-25 hrs/week',
      skills: ['Communication', 'English', 'Customer Service'],
      description: 'Handle customer inquiries via phone and chat. Training provided for qualified candidates.',
      requirements: ['Good English communication', 'Phone availability', 'Flexible schedule'],
      rating: 4.5,
      verified: true,
      urgent: true,
      remote: false,
      posted: '1 day ago'
    },
    {
      id: 3,
      title: 'Content Moderator',
      company: 'SafeSpace Media',
      location: 'Remote',
      type: 'Part-time',
      hourlyRate: '$10-13',
      hours: '10-15 hrs/week',
      skills: ['Attention to Detail', 'English', 'Internet Skills'],
      description: 'Review and moderate content according to platform guidelines. Flexible hours available.',
      requirements: ['Strong English skills', 'Reliable internet', 'Detail-oriented'],
      rating: 4.3,
      verified: true,
      urgent: false,
      remote: true,
      posted: '3 days ago'
    },
    {
      id: 4,
      title: 'Virtual Assistant',
      company: 'BusyBee Services',
      location: 'Remote',
      type: 'Part-time',
      hourlyRate: '$7-10',
      hours: '12-18 hrs/week',
      skills: ['Organization', 'Email Management', 'Scheduling'],
      description: 'Assist with administrative tasks including email management, scheduling, and basic research.',
      requirements: ['Basic computer skills', 'Good communication', 'Organized approach'],
      rating: 4.6,
      verified: true,
      urgent: false,
      remote: true,
      posted: '4 days ago'
    },
    {
      id: 5,
      title: 'Phone Repair Technician',
      company: 'QuickFix Electronics',
      location: 'Cairo, Egypt',
      type: 'Part-time',
      hourlyRate: '$15-20',
      hours: '20-30 hrs/week',
      skills: ['Technical Skills', 'Problem Solving', 'Mobile Repair'],
      description: 'Diagnose and repair mobile phones and tablets. Training can be provided for basic repairs.',
      requirements: ['Technical aptitude', 'Manual dexterity', 'Problem-solving skills'],
      rating: 4.8,
      verified: true,
      urgent: true,
      remote: false,
      posted: '1 day ago'
    },
    {
      id: 6,
      title: 'Online English Tutor',
      company: 'LearnGlobal',
      location: 'Remote',
      type: 'Part-time',
      hourlyRate: '$12-18',
      hours: '10-20 hrs/week',
      skills: ['English Teaching', 'Communication', 'Patience'],
      description: 'Teach basic English to non-native speakers via video calls. Flexible scheduling available.',
      requirements: ['Fluent English', 'Teaching interest', 'Stable internet connection'],
      rating: 4.9,
      verified: true,
      urgent: false,
      remote: true,
      posted: '2 days ago'
    }
  ];

  const locations = ['all', 'Remote', 'Lagos, Nigeria', 'Cairo, Egypt', 'Damascus, Syria', 'Gaza, Palestine'];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  const handleApply = (jobId: number) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
      alert('Application submitted successfully! The employer will review your application and contact you if selected.');
    }
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
              <Building2 className="w-6 h-6 text-green-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Part-Time Job Opportunities</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Find Your Perfect Part-Time Job
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with verified employers offering flexible part-time opportunities. 
            All jobs are from our trusted partner companies committed to fair employment practices.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">{filteredJobs.length}</div>
            <div className="text-gray-600">Available Jobs</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">{filteredJobs.filter(j => j.remote).length}</div>
            <div className="text-gray-600">Remote Positions</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-2xl font-bold text-purple-600 mb-2">{filteredJobs.filter(j => j.urgent).length}</div>
            <div className="text-gray-600">Urgent Hiring</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-2xl font-bold text-orange-600 mb-2">100%</div>
            <div className="text-gray-600">Verified Employers</div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-4">
                      {job.company.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        {job.title}
                        {job.urgent && (
                          <span className="ml-2 bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
                            Urgent
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Building2 className="w-4 h-4 mr-1" />
                        {job.company}
                        {job.verified && (
                          <span className="ml-2 text-green-600 text-xs">✓ Verified</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">{job.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{job.hours}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{job.hourlyRate}/hr</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                      <span className="text-sm text-gray-600">{job.rating} rating</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2 text-sm">Required Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2 text-sm">Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="lg:ml-6 lg:w-48">
                  <div className="text-right mb-4">
                    <div className="text-sm text-gray-500 mb-1">Posted {job.posted}</div>
                    <div className="text-lg font-bold text-gray-900">{job.hourlyRate}</div>
                    <div className="text-sm text-gray-600">{job.type}</div>
                  </div>

                  {appliedJobs.includes(job.id) ? (
                    <button
                      disabled
                      className="w-full bg-gray-100 text-gray-500 py-3 px-6 rounded-lg font-semibold cursor-not-allowed"
                    >
                      Applied ✓
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApply(job.id)}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 focus:ring-4 focus:ring-green-300 transform hover:scale-[1.02] transition-all duration-200"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-8">
              Try adjusting your search terms or location filter
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLocation('all');
              }}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
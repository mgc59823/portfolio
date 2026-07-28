/**
 * ==========================================================================
 * 민경천 포트폴리오 - Supabase 클라이언트 연동 모듈 (supabaseClient.js)
 * Supabase 데이터베이스 URL 및 API 키 연동
 * 프로필(자기소개) 및 작업물(프로젝트) DB 비동기 읽기/쓰기 처리
 * ==========================================================================
 */

export const SUPABASE_URL = "https://jeubjwaalcwkkxshbxys.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_9qdJ56qWaMxsoJaSIlBWWQ_gdy45IwL";

// Supabase JS Client 인스턴스 초기화 (window.supabase 또는 글로벌 CDN 연동)
let supabaseClient = null;

function getSupabase() {
    if (!supabaseClient) {
        if (window.supabase && typeof window.supabase.createClient === 'function') {
            supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        }
    }
    return supabaseClient;
}

/**
 * Supabase DB에서 프로필 데이터를 비동기로 조회합니다
 * @returns {Promise<Object|null>} 프로필 데이터 객체 또는 실패 시 null
 */
export async function fetchProfileFromSupabase() {
    const client = getSupabase();
    if (!client) return null;

    try {
        const { data, error } = await client
            .from('profiles')
            .select('*')
            .eq('id', 'mgc_profile')
            .single();

        if (error) {
            console.warn("Supabase 프로필 조회 경고:", error.message);
            return null;
        }
        return data;
    } catch (e) {
        console.warn("Supabase 프로필 연동 오류:", e);
        return null;
    }
}

/**
 * Supabase DB에 프로필(자기소개) 데이터를 저장/업데이트합니다
 * @param {Object} profile 
 * @returns {Promise<boolean>} 성공 여부
 */
export async function saveProfileToSupabase(profile) {
    const client = getSupabase();
    if (!client) return false;

    try {
        const payload = {
            id: 'mgc_profile',
            name: profile.name,
            title: profile.title,
            headline: profile.headline,
            education: profile.education,
            bio: profile.bio,
            skills: profile.skills || {},
            email: profile.email || 'mgc59823@gmail.com',
            github: profile.github || 'https://github.com/mgc59823',
            updated_at: new Date().toISOString()
        };

        const { error } = await client
            .from('profiles')
            .upsert(payload, { onConflict: 'id' });

        if (error) {
            console.error("Supabase 프로필 저장 오류:", error.message);
            return false;
        }
        return true;
    } catch (e) {
        console.error("Supabase 프로필 저장 예외:", e);
        return false;
    }
}

/**
 * Supabase DB에서 프로젝트 목록을 조회합니다
 * @returns {Promise<Array|null>} 프로젝트 배열 또는 실패 시 null
 */
export async function fetchProjectsFromSupabase() {
    const client = getSupabase();
    if (!client) return null;

    try {
        const { data, error } = await client
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.warn("Supabase 프로젝트 목록 조회 경고:", error.message);
            return null;
        }

        if (data && data.length > 0) {
            // DB 컬럼 구조를 앱 객체 구조로 변환
            return data.map(p => ({
                id: p.id,
                title: p.title,
                category: p.category,
                categoryName: p.category_name || p.categoryName,
                summary: p.summary,
                tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags,
                image: p.image,
                details: typeof p.details === 'string' ? JSON.parse(p.details) : p.details
            }));
        }
        return data;
    } catch (e) {
        console.warn("Supabase 프로젝트 연동 오류:", e);
        return null;
    }
}

/**
 * Supabase DB에 신규 프로젝트를 저장합니다
 * @param {Object} project 
 * @returns {Promise<boolean>}
 */
export async function saveProjectToSupabase(project) {
    const client = getSupabase();
    if (!client) return false;

    try {
        const payload = {
            id: project.id,
            title: project.title,
            category: project.category,
            category_name: project.categoryName,
            summary: project.summary,
            tags: project.tags,
            image: project.image,
            details: project.details,
            created_at: new Date().toISOString()
        };

        const { error } = await client
            .from('projects')
            .upsert(payload, { onConflict: 'id' });

        if (error) {
            console.error("Supabase 프로젝트 저장 오류:", error.message);
            return false;
        }
        return true;
    } catch (e) {
        console.error("Supabase 프로젝트 저장 예외:", e);
        return false;
    }
}

/**
 * Supabase DB에서 특정 프로젝트를 삭제합니다
 * @param {string} projectId 
 * @returns {Promise<boolean>}
 */
export async function deleteProjectFromSupabase(projectId) {
    const client = getSupabase();
    if (!client) return false;

    try {
        const { error } = await client
            .from('projects')
            .delete()
            .eq('id', projectId);

        if (error) {
            console.error("Supabase 프로젝트 삭제 오류:", error.message);
            return false;
        }
        return true;
    } catch (e) {
        console.error("Supabase 프로젝트 삭제 예외:", e);
        return false;
    }
}
